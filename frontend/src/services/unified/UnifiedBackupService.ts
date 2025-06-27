import { UnifiedLogger } from '@/core/UnifiedLogger.ts';
import { UnifiedSettingsService } from './UnifiedSettingsService.ts';
import { UnifiedErrorService } from './UnifiedErrorService.ts';
import { UnifiedServiceRegistry } from '@/unified/UnifiedServiceRegistry.ts';
import { promises as fs } from 'fs.ts';
import path from 'path.ts';
import { exec } from 'child_process.ts';
import { promisify } from 'util.ts';

export interface BackupConfig {
  enabled: boolean;
  schedule: string; // Cron expression;
  retentionDays: number;
  backupPath: string;
  includeDatabases: boolean;
  includeFiles: boolean;
  includeLogs: boolean;
  compression: boolean;
  encryption: boolean;
  encryptionKey?: string;
}

export interface BackupResult {
  success: boolean;
  timestamp: number;
  backupPath: string;
  size: number;
  error?: string;
}

export class UnifiedBackupService {
  private static instance: UnifiedBackupService;
  private logger: UnifiedLogger;
  private settings: UnifiedSettingsService;
  private errorService: UnifiedErrorService;
  private config: BackupConfig;

  private constructor(registry: UnifiedServiceRegistry) {
    this.logger = UnifiedLogger.getInstance();
    this.settings = UnifiedSettingsService.getInstance(registry);
    this.errorService = UnifiedErrorService.getInstance(registry);
    this.config = this.loadConfig();
  }

  public static getInstance(registry: UnifiedServiceRegistry): UnifiedBackupService {
    if (!UnifiedBackupService.instance) {
      UnifiedBackupService.instance = new UnifiedBackupService(registry);
    }
    return UnifiedBackupService.instance;
  }

  private loadConfig(): BackupConfig {
    return {
      enabled: this.settings.get('backup.enabled', true),
      schedule: this.settings.get('backup.schedule', '0 0 * * *'), // Daily at midnight;
      retentionDays: this.settings.get('backup.retentionDays', 30),
      backupPath: this.settings.get('backup.path', './backups'),
      includeDatabases: this.settings.get('backup.includeDatabases', true),
      includeFiles: this.settings.get('backup.includeFiles', true),
      includeLogs: this.settings.get('backup.includeLogs', true),
      compression: this.settings.get('backup.compression', true),
      encryption: this.settings.get('backup.encryption', true),
      encryptionKey: this.settings.get('backup.encryptionKey', undefined),
    };
  }

  public async performBackup(): Promise<BackupResult> {
    if (!this.config.enabled) {
      this.logger.warn('Backup service is disabled', 'backup');
      return {
        success: false,
        timestamp: Date.now(),
        backupPath: '',
        size: 0,
        error: 'Backup service is disabled',
      };
    }

    try {


      await fs.mkdir(backupDir, { recursive: true });

      const tasks: Promise<void>[] = [];

      if (this.config.includeDatabases) {
        tasks.push(this.backupDatabases(backupDir));
      }

      if (this.config.includeFiles) {
        tasks.push(this.backupFiles(backupDir));
      }

      if (this.config.includeLogs) {
        tasks.push(this.backupLogs(backupDir));
      }

      await Promise.all(tasks);

      if (this.config.compression) {
        await this.compressBackup(backupDir);
      }

      if (this.config.encryption && this.config.encryptionKey) {
        await this.encryptBackup(backupDir);
      }

      const result: BackupResult = {
        success: true,
        timestamp: Date.now(),
        backupPath: backupDir,
        size: stats.size,
      };

      this.logger.info('Backup completed successfully', 'backup', result);
      return result;
    } catch (error) {

      this.logger.error(`Backup failed: ${errorMessage}`, 'backup');
      this.errorService.handleError(error, 'backup', 'BACKUP_FAILED');
      return {
        success: false,
        timestamp: Date.now(),
        backupPath: '',
        size: 0,
        error: errorMessage,
      };
    }
  }

  private async backupDatabases(backupDir: string): Promise<void> {


    await fs.mkdir(dbBackupDir, { recursive: true });

    // Backup PostgreSQL;
    if (dbConfig.postgres) {
      const { host, port, database, username, password } = dbConfig.postgres;


      await execAsync(
        `pg_dump -h ${host} -p ${port} -U ${username} -d ${database} -F c -f ${dumpFile}`,
        { env }
      );
    }

    // Backup Redis;
    if (dbConfig.redis) {
      const { host, port, password } = dbConfig.redis;


      await execAsync(`redis-cli -h ${host} -p ${port} SAVE`, { env });
      await fs.copyFile('/var/lib/redis/dump.rdb', dumpFile);
    }
  }

  private async backupFiles(backupDir: string): Promise<void> {

    await fs.mkdir(filesDir, { recursive: true });

    // Backup configuration files;
    await fs.copyFile('.env', path.join(filesDir, '.env'));
    await fs.copyFile('package.json', path.join(filesDir, 'package.json'));
    await fs.copyFile('tsconfig.json', path.join(filesDir, 'tsconfig.json'));

    // Backup source code;

    await fs.mkdir(srcDir, { recursive: true });
    await this.copyDir('src', srcDir);
  }

  private async backupLogs(backupDir: string): Promise<void> {

    await fs.mkdir(logsDir, { recursive: true });
    await this.copyDir('logs', logsDir);
  }

  private async copyDir(src: string, dest: string): Promise<void> {

    await fs.mkdir(dest, { recursive: true });

    for (const entry of entries) {


      if (entry.isDirectory()) {
        await this.copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  private async compressBackup(backupDir: string): Promise<void> {

    await execAsync(
      `tar -czf ${archivePath} -C ${path.dirname(backupDir)} ${path.basename(backupDir)}`
    );
    await fs.rm(backupDir, { recursive: true, force: true });
  }

  private async encryptBackup(backupDir: string): Promise<void> {
    if (!this.config.encryptionKey) {
      throw new Error('Encryption key is required for backup encryption');
    }


    await execAsync(
      `openssl enc -aes-256-cbc -salt -in ${archivePath} -out ${encryptedPath} -pass pass:${this.config.encryptionKey}`
    );
    await fs.unlink(archivePath);
  }

  public async verifyBackup(backupPath: string): Promise<boolean> {
    try {

      if (!stats.isFile()) {
        throw new Error('Backup file not found');
      }

      if (this.config.encryption && this.config.encryptionKey) {
        // Verify encrypted backup;

        await execAsync(
          `openssl enc -aes-256-cbc -d -in ${backupPath} -out ${tempPath} -pass pass:${this.config.encryptionKey}`
        );
        await fs.unlink(tempPath);
      }

      if (this.config.compression) {
        // Verify compressed backup;
        await execAsync(`tar -tzf ${backupPath}`);
      }

      this.logger.info('Backup verification successful', 'backup', { backupPath });
      return true;
    } catch (error) {

      this.logger.error(`Backup verification failed: ${errorMessage}`, 'backup');
      return false;
    }
  }

  public async cleanupOldBackups(): Promise<void> {
    try {



      for (const entry of entries) {



        if (age > retentionMs) {
          await fs.rm(entryPath, { recursive: true, force: true });
          this.logger.info(`Deleted old backup: ${entry}`, 'backup');
        }
      }
    } catch (error) {

      this.logger.error(`Failed to cleanup old backups: ${errorMessage}`, 'backup');
    }
  }
}
