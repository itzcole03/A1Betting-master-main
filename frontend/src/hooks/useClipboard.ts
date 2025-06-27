import { useState, useCallback } from 'react.ts';



interface UseClipboardOptions {
  timeout?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseClipboardResult {
  copied: boolean;
  copy: (text: string) => Promise<void>;
  reset: () => void;
}

export function useClipboard({
  timeout = 2000,
  onSuccess,
  onError;
}: UseClipboardOptions = {}): UseClipboardResult {
  const [copied, setCopied] = useState(false);

  const reset = useCallback(() => {
    setCopied(false);
  }, []);

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers;

          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            document.execCommand('copy');
          } catch (error) {
            // console statement removed
            throw error;
          } finally {
            textArea.remove();
          }
        }

        setCopied(true);
        onSuccess?.();

        if (timeout > 0) {
          setTimeout(reset, timeout);
        }
      } catch (error) {
        if (error instanceof Error) {
          // console statement removed
          onError?.(error);
        }
        throw error;
      }
    },
    [timeout, reset, onSuccess, onError]
  );

  return { copied, copy, reset };
}

// Example usage:
/*
function CopyButton({ text }: { text: string }) {
  const { copied, copy } = useClipboard({
    timeout: 2000,
    onSuccess: () => // console statement removed,
    onError: (error) => // console statement removed
  });

  return (
    <button;
      onClick={() => copy(text)}
      className={`px-4 py-2 rounded ${
        copied ? 'bg-green-500' : 'bg-blue-500'
      } text-white`}
    >
      {copied ? 'Copied!' : 'Copy to Clipboard'}
    </button>
  );
}

// With Toast notifications;
function CopyWithToast({ text }: { text: string }) {
  const { copy } = useClipboard({
    onSuccess: () => {
      toast.success('Copied to clipboard!');
    },
    onError: () => {
      toast.error('Failed to copy to clipboard');
    }
  });

  return (
    <button onClick={() => copy(text)}>
      Copy;
    </button>
  );
}
*/ 