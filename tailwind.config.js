/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#3B418B',
        'secondary':'#D2AE6D',
        'dark':'#0C0F35',
        't2':'#585C8C',
        't3':'#94A3B8',
        't4':'#CBD4E1',
        't5':'#E2E8F0',
        't6':'#F1F4F9',
        't7':'#F6F8FC',
        'error':'#B01212',
        'success':'#00632B',
        'warning':'#EFB008',
        'info': '#2563EB',
      },
      fontSize:{
        '14':['14px','20px'],
        '16':['16px','24px'],
        '18':['18px','26px'],
        '20':['20px','28px'],
        '22':['22px','30px'],
        '24':['24px','32px'],
        '26':['26px','36px'],
        '36':['36px','44px'],
        '40':['40px','52px'],
        '44':['44px','60px'],
        '48':['48px','64px'],
        '56':['56px','72px'],
        '64':['64px','74px'],
      },
      boxShadow:{
        'one':'18px 2px 24px 0px rgba(12, 15, 53, 0.12)',
        'two':'0px 4px 24px 0px rgba(12, 15, 53, 0.12)',
        'three':'0px 14px 40px 0px rgba(0,0,0,0.1)',
        'four':'0px 20px 50px 0px rgba(18, 17, 39, 0.08)'
      }

    },
  },
  plugins: [],
}