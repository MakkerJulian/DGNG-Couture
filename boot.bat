@echo off
if [%1]==[] goto :quick

echo "Full boot"
start cmd /c "cd .\front-end\ && npm i && npm run start"
start cmd /c "cd .\back-end\ && npm i && npm run docker:reset && npm run start:dev"
goto :end

:quick
echo "Quick boot"
start cmd /c "cd .\front-end\ && npm run start"
start cmd /c "cd .\back-end\ && npm run start:dev"
:end
