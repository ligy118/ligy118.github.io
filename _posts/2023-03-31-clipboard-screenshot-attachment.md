---
title: "Access快速开发平台--为平台附件模块增加从剪切板获取截图/微信图片功能"
date: 2023-03-31 14:23:41 +0800
categories: [计算机]
tags: [access]
---

有个外协厂，坚持手写单据，数据时效性极差，且不好管理。

      用Access写个管理工具，让外协厂的制单员每写一个单据就通过微信拍照发过来。

      数据手工录入，单据也想以图片形式保存备查。

      盟威[**Access快速开发****平台**](http://www.accessgood.com)的附件模块很好用，但微信接收图片，保存成文件，通过文件选择器选择这个文件，这一流程有些繁琐了。

      故有此改动，一键从剪切板获取图片并保存成文件给附件模块。分享一下示例给有需要的学友参考。

**附****件**:

![](/downloads/download.gif)[**点击下载此附件**](http://www.accessoft.com/article_attached/2023/file/202303/202303311423352854.zip)

**图****示**:

[![点击图片查看大图](/downloads/clipboard-screenshot-attachment-图示.png "点击查看大图")](/downloads/clipboard-screenshot-attachment-图示.png)

**说****明**:

原理很简单，通过第三方工具保存剪切板，然后把保存的文件的路径传给附件模块。

用的第三方工具是开源的，开发者提供exe，已下载随附件存放放在根目录\JianQieBan\ 中，若不放心也可以自行编译。

[GitHub - PiyushSuthar/clpy：直接从命令行将剪贴板📋中的图像保存为图像文件！🔥](https://github.com/PiyushSuthar/clpy)

[![点击图片查看大图](/downloads/clipboard-screenshot-attachment-clpy.png "点击查看大图")](/downloads/clipboard-screenshot-attachment-clpy.png)

vba调用JieTu.bat ，JieTu.bat运行clpy.exe 进行保存剪切板并将日志写入output.txt。

vba通过读取output.txt日志获取保存结果。

JieTu.bat代码如下:

```vba
@echo off
setlocal
set A=%1
type nul > output.txt
clpy.exe %A% > output.txt 2>&1
```

若想加入自己的工具中，可用以下三步解决。

1. 把\JianQieBan\放在自己的根目录文件夹下；

2. 修改平台的sysFrmAttachments窗体，为之添加一个按钮，一个文本框；分别命名为：btn粘贴   txt粘贴文件名

如下图：

[![点击图片查看大图](/downloads/clipboard-screenshot-attachment-效果图.png "点击查看大图")](/downloads/clipboard-screenshot-attachment-效果图.png)

3. 为btn粘贴增加以下点击事件(改了原btnadd按钮)

```vba
Private Sub btn粘贴_Click()
    On Error GoTo ErrorHandler

    'With FileDialog(msoFileDialogFilePicker)
    '    .Filters.Clear
    '    .AllowMultiSelect = True
    '    If Not .Show Then Exit Sub
'---------------------------------------------------------------------------
'替换附件模块的文件选择代码，执行保存剪切板图片，并将之路径当作原来的文件选择后的路径进行后续操作。
    Dim ZhanTiepath As String
    ZhanTiepath = CurrentProject.Path & "\JianQieBan\" & "JieTu.bat " & Me.txt粘贴文件名

    '执行粘贴剪切板
    'Call Shell(ZhanTiepath)
    ' 问题所在，没有切换路径
    ChDir CurrentProject.Path & "\JianQieBan"

    '同步调用
    Dim oShell As Object, ret As String
    Set oShell = CreateObject("WSCript.shell")
    ret = oShell.Run(ZhanTiepath, 0, True)
    'ret = oShell.Run(ThisWorkbook.Path & "\test.bat" & " test.ini rettest")
    Set oShell = Nothing

    '为了等待保存完成并写入新日志
    sleep 500

    Dim strFile As String
    Dim strText As String
    Dim intPos As Integer
    Dim strLastWord As String

    '从日志文件获取文件名
    strFile = Application.CurrentProject.Path & "\JianQieBan\output.txt"
    Dim objStream, strData
    Set objStream = CreateObject("ADODB.Stream")
    objStream.Charset = "utf-8"
    objStream.Open
    objStream.LoadFromFile (strFile)
    strText = objStream.ReadText(-1)
    ' 处理数据
    objStream.Close
    Set objStream = Nothing

    If Len(strText) < 5 Then
    MsgBox "剪切板没图片 或者粘贴失败"
        Exit Sub
    End If

     '查找文本中的最后一个as
    intPos = InStrRev(strText, "as ")

    '获取as后的部分（也就是图片的文件名）
    strLastWord = Right(strText, Len(strText) - intPos - 2)
    '去除空格
    strLastWord = Trim(strLastWord)
    '检测地址中是否有回车换行并去除
    If InStr(1, strLastWord, Chr(10), vbBinaryCompare) > 0 Then
        strLastWord = Replace(strLastWord, Chr(10), "", , , vbBinaryCompare)
        strLastWord = Replace(strLastWord, Chr(13), "", , , vbBinaryCompare)
    End If

    strLastWord = Trim(strLastWord)
    If Right(strLastWord, 3) <> "png" Then
        MsgBox "剪切板没图片 或者粘贴失败"
        Exit Sub
    End If

    Dim varItem As String
    varItem = CurrentProject.Path & "\JianQieBan\" & strLastWord

    '清空日志以便下次粘贴判断是否粘贴成功
     '获取文件名
    strFile = Application.CurrentProject.Path & "\JianQieBan\output.txt"
    '打开文件
    Open strFile For Output As #2
    '清空文件内容
    Print #2, ""
    '关闭文件
    Close #2

    Me.txt粘贴文件名 = ""
    '清空文件名输入框以便继续输入

'粘贴结束，图片路径为varItem ,以下是附件模块原始部分，仅注释掉选择多个文件的部分。
'-------------------------------------------------------------------
        Set rst = CurrentDb.OpenRecordset("TMP_Attachments", , dbAppendOnly)

        'Dim varItem As Variant
        'For Each varItem In .SelectedItems
            rst.AddNew
            rst!Update_MODE = "ADD"
            rst!Flag = NewTimeID()
            rst!ID = NewTimeID()
            rst!SessionID = Me.SessionID
            rst!FileSize = FileLen(CStr(varItem))
            rst!FileSizeFormat = FileLenFormat(CLng(rst!FileSize))
            rst!DataCategory = Me.DataCategory
            rst!DataID = Me.DataID
            rst!AttachmentName = Mid(varItem, InStrRev(varItem, "\") + 1)
            If varItem <> Me.AttachmentFullName(rst!AttachmentName) Then
                PathFileOperation foCopy, CStr(varItem), Me.AttachmentFullName(rst!AttachmentName)
            End If
            rst.Update
        'Next
        rst.Close

        Me.OnCurrent = ""
        Me.RequeryDataSource
        Me.Recordset.MoveLast
        Me.OnCurrent = "[Event Procedure]"
        Me.PreviewAttachment
    'End With

ExitHere:
    Exit Sub

ErrorHandler:
    MsgBoxEx "Sub AddAttachment()" _
           & vbCrLf & Err.Description, vbCritical
    Resume ExitHere
End Sub
```

      实测QQ、微信的截图工具，还有别人发来的图片复制后，都可以运行，与原来通过文件选择器选择的图片文件体验一样。

      可以自定义文件名，也可以什么都不填，自动用随机乱码命名。

来源：http://www.accessoft.com/blog/article-show.asp?userid=81743&Id=20697
