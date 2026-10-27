---
title: "【Access自定义函数】“记录是否存在”的函数"
date: 2021-12-11 09:04:32 +0800
categories: [计算机]
tags: [access]
---

需要频繁判断记录在表中是否存在，可以自定义一个“记录是否存在”函数，减少工作量。

单条件记录在表中是否存在，用下面自定义函数：

```vba
Function RecordExists1(sTbName1 As String, SFdName1 As String, sRecordValue1 As String) As Boolean
    'sTbName1 要查找的表名
    'SFdName1 要查找的字段名
    'sRecordValue1 要查找的记录值

    RecordExists1 = False
    SFdName1 = "[" & SFdName1 & "]"
    sRecordValue1 = "'" & sRecordValue1 & "'"
    If DCount(SFdName1, sTbName1, SFdName1 & " = " & sRecordValue1) > 0 Then
        RecordExists1 = True
    End If
End Function
```

![](/downloads/202112111004530747.png)

两个条件的记录在表中是否存在，用下面自定义函数：

```vba
Function RecordExists2(sTbName1 As String, SFdName1 As String, SFdName2 As String, sRecordValue1 As String, sRecordValue2 As String) As Boolean
    'sTbName1 要查找的表名
    'SFdName1 要查找的字段名1
    'SFdName2 要查找的字段名2
    'sRecordValue1 要查找的记录值1
    'sRecordValue2 要查找的记录值2

    RecordExists2 = False
    SFdName1 = "[" & SFdName1 & "]"
    SFdName2 = "[" & SFdName2 & "]"
    sRecordValue1 = "'" & sRecordValue1 & "'"
    sRecordValue2 = "'" & sRecordValue2 & "'"
    If DCount(SFdName1, sTbName1, SFdName1 & " = " & sRecordValue1 & "AND" & SFdName2 & " = " & sRecordValue2) > 0 Then
        RecordExists2 = True
    End If
End Function
```

![](/downloads/202112111005039123.png)

**应用示例**:

![](/downloads/download.gif)[**点击下载此附件**](http://www.accessoft.com/article_attached/2021/file/202112/202112110903471815.zip)

**图   示**:

[![点击图片查看大图](/downloads/202112110902166381.png "点击查看大图")](/downloads/202112110902166381.png)

[![点击图片查看大图](/downloads/202112110902265303.png "点击查看大图")](/downloads/202112110902265303.png)

[![点击图片查看大图](/downloads/202112110902349777.png "点击查看大图")](/downloads/202112110902349777.png)

来源：http://www.accessoft.com/blog/article-show.asp?userid=81743&Id=20126
