@echo off 
::�������JS��CSS��Ŀ¼���ű����Զ�������β��Һ�ѹ�����е�JS��CSS 
SET JSFOLDER=. 
echo ���ڲ��� JavaScript, CSS ... 
chdir /d %JSFOLDER% 
for /r . %%a in (*.js *.css) do ( 
@echo ����ѹ�� %%~a ... 
@java -jar .\yuicompressor-2.4.7.jar --charset UTF-8 %%~fa -o %%~fa 
) 
echo ���! 
pause & exit