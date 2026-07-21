/**
 * LocalStorage debugging utility
 * Use this to check if localStorage is working correctly
 */

export const storageDebug = {
  /**
   * Check if localStorage is available and working
   */
  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.error('localStorage is not available:', e);
      return false;
    }
  },

  /**
   * Get all auth-related items from localStorage
   */
  getAuthItems(): { access_token: string | null; refresh_token: string | null } {
    if (typeof window === 'undefined') {
      return { access_token: null, refresh_token: null };
    }

    return {
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
    };
  },

  /**
   * Log current auth status to console
   */
  logAuthStatus(): void {
    const items = this.getAuthItems();
    console.log('=== Auth Status ===');
    console.log('localStorage available:', this.isAvailable());
    console.log('Has access_token:', !!items.access_token);
    console.log('Has refresh_token:', !!items.refresh_token);
    console.log('Access token length:', items.access_token?.length || 0);
    console.log('==================');
  },

  /**
   * Save auth tokens with error handling
   */
  saveTokens(accessToken: string, refreshToken: string): boolean {
    if (!this.isAvailable()) {
      console.error('Cannot save tokens: localStorage not available');
      return false;
    }

    try {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      console.log('Tokens saved successfully');
      return true;
    } catch (e) {
      console.error('Failed to save tokens:', e);
      return false;
    }
  },

  /**
   * Clear all auth tokens
   */
  clearTokens(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    console.log('Tokens cleared');
  },
};
