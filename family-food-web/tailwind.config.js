/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB6C1',
        'primary-light': '#FFC0CB',
        bg: '#FFF0F5',
        card: '#FFFFFF',
        text: '#5C4A4A',
        'text-sub': '#999999',
        success: '#7FCD91',
        danger: '#FF6B6B',
        border: '#F5E6E8',
      },
      fontFamily: {
        cute: ['"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        cute: '0 4rpx 16rpx rgba(255, 182, 193, 0.25)',
        'cute-lg': '0 8rpx 24rpx rgba(255, 182, 193, 0.35)',
      },
      borderRadius: {
        cute: '24rpx',
      },
    },
  },
  plugins: [],
}
