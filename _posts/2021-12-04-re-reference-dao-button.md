---
title: "创建让用户“重新引用dao”按钮"
date: 2021-12-04 16:58:13 +0800
categories: [计算机]
tags: [access]
redirect_from:
  - /re-reference-dao-button.html
---

[**盟威Access快速开发****平台**](http://www.accessgood.com)的版本更新是直接替换main.mdb文件，偶尔在使用了盟威平台的版本更新或者把程序放在新电脑上后会出现dao引用失效的情况。起初根据 [通过函数自动引用DAO](http://www.accessoft.com/article-show.asp?id=17537)  ，在  SysFrmLogin的Form\_Load事件中重新引用dao。每次在关闭时会提示“是否保存对窗体的修改”，如下图：

![](/downloads/202112111452382367.PNG)

      虽然屏蔽系统警告可以解决，简单粗暴有效，但没了系统警告是很危险的，并且随着代码的复杂程度提高，很有可能在其他地方又解除了屏蔽警告。因此可以给用户创建个重新引用dao的按钮，在dao失效时手动一键重新引用dao，并可以配合vba达到同时重启的效果。

**附   件**:

![](/downloads/download.gif)[**点击下载此附件**](http://www.accessoft.com/article_attached/2021/file/202112/202112111454307669.zip)

**图   示**:

![](/downloads/202112130908292041.jpg)

**代   码**:

```vba
Public Function ReAddDAO()
    Dim REFE As References '声明REFE为引用
    Dim strFileName As String '声明strFileName为文本型变量
    Dim rf As Object
    Set REFE = Application.References
    For Each rf In REFE '在引用中循环查找
        If rf.Name = "DAO" Then   '如果名字为DAO就移动DAO的引用
            Application.References.Remove rf '移除
            Exit For '退出循环
        End If
    Next
    strFileName = "C:\Program Files (x86)\Common Files\microsoft shared\DAO\dao360.dll"
    Set rf = Application.References.AddFromFile(strFileName) '重新引用DAO
End Function
```

```vba
![](/downloads/202112111459179693.png)
```

```vba
Private Sub btnRepair_Click()
    Call ReAddDAO

    Dim repairpath As String
    'Debug.Print (CurrentProject.path)
    repairpath = CurrentProject.Path & "\" & "repair.bat"
    'Debug.Print (repairpath)
    Call Shell(repairpath)

    Application.Quit acQuitSaveAll
End Sub
```

```vba
![](/downloads/202112111459562069.png)
```

```vba
@echo off
timeout /t 2 /nobreak > nul
set repairpath=%~dp0
set main=main.mdb
set repair=%repairpath%%main%
start %repair%
exit
```

来源：http://www.accessoft.com/blog/article-show.asp?userid=81743&Id=20116
