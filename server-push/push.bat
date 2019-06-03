@ECHO OFF 
psftp.exe dexter@10.0.1.133 -pw Pand0ra1 -b "C:\Users\Dexter\Documents\Coding\virtual-ripred\server-push\commands.txt"
echo y | plink.exe -ssh dexter@10.0.1.133 -pw Pand0ra1 "pm2 restart virtualRipred"