@echo off
mkdir public\images 2>nul
mkdir public\icons 2>nul
mkdir public\brand 2>nul
mkdir scripts\icon-gen\assets 2>nul

echo Moving Images...
move /Y public\mini3pro.png public\images\
move /Y public\avata2.png public\images\
move /Y public\profilepic.png public\images\

echo Moving Icons...
move /Y public\apple-touch-icon.png public\icons\
move /Y public\favicon-*.png public\icons\
move /Y public\icon-*.png public\icons\

echo Moving Brand...
move /Y public\logo_final.svg public\brand\
move /Y public\logo_complete_with_drone.svg public\brand\
move /Y public\drone_geometric.svg public\brand\

echo Moving Assets...
move /Y public\icon-gen\drone-mask.png scripts\icon-gen\assets\

echo Cleaning up...
rmdir /S /Q public\icon-gen 2>nul

echo Done.
