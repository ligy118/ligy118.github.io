---
title: "按ESC退出附件窗体时去掉“用户取消操作”弹窗的解决方法"
date: 2023-05-08 15:45:21 +0800
categories: [计算机]
tags: [access]
redirect_from:
  - /esc-attachment-cancel-dialog.html
---

[**Access快速开发****平台**](http://www.accessgood.com)的**[通用附件管理模块](http://www.accessgood.com/help/attachment.html)**，如果打开不进行操作，按esc直接退出，有时会弹“用户取消操作”弹窗。如下图：

[![点击图片查看大图](/downloads/202305081623166295.png "点击查看大图")](/downloads/202305081623166295.png)

**解决方法1：**

用鼠标点“取消”按钮即可。

**解决方法2：**

弹窗代码位于**SysFrmAttachments**窗体的**EmptyDump**过程。错误代码为3059，修改此过程，屏蔽掉3059错误的弹窗。

```vba
Public Sub EmptyDump()
    On Error GoTo ErrorHandler
'
ExitHere:
    On Error Resume Next
    CurrentDb.Execute "Delete FROM TMP_Attachments Where SessionID='" & Me.SessionID & "'"
    Exit Sub

ErrorHandler:
    If strFlag <> "File deleted" Then
        '如果是3059报错就不提示。
        If Err <> 3059 Then
            MsgBoxEx Err.Description, vbCritical
        End If
        
    End If
    Resume ExitHere
End Sub
```

具体报错原因没时间查，我的思路如下：

运行Set rst = CurrentDb.OpenRecordset(strSQL) 这句代码时出现了问题。

[![点击图片查看大图](/downloads/202305081625532787.png "点击查看大图")](/downloads/202305081625532787.png)

来源：http://www.accessoft.com/blog/article-show.asp?userid=81743&Id=20732
