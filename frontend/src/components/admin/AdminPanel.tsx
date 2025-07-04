/**
 * AdminPanel component for the UltimateSportsBettingApp.
 * 
 * Provides an administrative interface for managing users, viewing system logs, and monitoring system statistics.
 * Accessible only to authorized admin users. Utilizes React Query for data fetching and Framer Motion for animations.
 */

import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/formatters.js';
import { adminService, User, SystemLog, SystemMetrics } from '../../services/adminService.js';
import { useAuth } from '../../hooks/useAuth.js';
import { motion } from 'framer-motion';

// Temporary fallback for formatNumber if not exported from formatters.js
const formatNumber = (value?: number) => (typeof value === 'number' ? value.toLocaleString() : '');

/**
 * AdminPanel component provides an administrative interface for managing users, viewing system logs, and monitoring system statistics.
 *
 * Props: None
 *
 * State:
 * - activeTab: Controls which admin tab is active ('users', 'logs', or 'stats').
 * - searchQuery: Filters the user list by name or email.
 *
 * Behavior:
 * - Fetches users, logs, and system metrics using React Query.
 * - Allows admin to update user status (active/suspended).
 * - Displays system logs and key system metrics.
 */
const AdminPanel: React.FC = () => {
  useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'users' | 'logs' | 'stats'>('users');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['admin-users'],
    queryFn: () => adminService.getUsers(),
  });

  // Fetch logs
  const { data: logs, isLoading: logsLoading } = useQuery<SystemLog[]>({
    queryKey: ['admin-logs'],
    queryFn: () => adminService.getLogs(),
  });

  // Fetch system metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery<SystemMetrics>({
    queryKey: ['admin-metrics'],
    queryFn: () => adminService.getMetrics(),
  });

  /**
   * Updates the status of a user (active or suspended).
   * 
   * @param userId - The unique identifier of the user to update.
   * @param status - The new status to set for the user ('active' or 'suspended').
   * @sideEffect Shows a toast notification on success or failure, and invalidates the users query cache.
   */
  const handleUserStatusUpdate = async (userId: string, status: 'active' | 'suspended') => {
    try {
      await adminService.updateUserStatus(userId, status);
      toast.success('User status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    } catch {
      toast.error('Failed to update user status');
    }
  };

  const filteredUsers = useMemo(
    () =>
      users?.filter((user: User) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [users, searchQuery]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {(['users', 'logs', 'stats'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {usersLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  filteredUsers?.map((user: User) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleUserStatusUpdate(
                            user.id,
                            user.status === 'active' ? 'suspended' : 'active'
                          )}
                          className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                        >
                          {user.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">System Logs</h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              {logsLoading ? (
                <div className="px-6 py-4 text-center">Loading...</div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {logs?.map((log: SystemLog) => (
                    <div key={log.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {log.message}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(log.timestamp)}
                          </p>
                        </div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.level === 'error'
                            ? 'bg-red-100 text-red-800'
                            : log.level === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                          {log.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Users</h3>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {metricsLoading ? '...' : formatNumber(metrics?.totalUsers)}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Sessions</h3>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {metricsLoading ? '...' : formatNumber(metrics?.activeSessions)}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Predictions</h3>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {metricsLoading ? '...' : formatNumber(metrics?.totalPredictions)}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">System Uptime</h3>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {metricsLoading ? '...' : metrics?.uptime}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminPanel;
