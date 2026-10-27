---
title: "【Access思路分享】合并多条记录为一个记录"
date: 2021-12-18 15:57:20 +0800
categories: [计算机]
tags: [access]
---

合并多条记录为一个记录示例见：

**[[案例分享]分析物料在不同清单中的分布情况【Access软件网】 (accessoft.com)](http://www.accessoft.com/article-show.asp?id=20134)**

**图   示**:

![](/downloads/merge-records-图示.png)

[![点击图片查看大图](/downloads/merge-records-图示2.png "点击查看大图")](/downloads/merge-records-图示2.png)

首先通过查询，对待合并表进行排序

[![点击图片查看大图](/downloads/merge-records-排序查询.png "点击查看大图")](/downloads/merge-records-排序查询.png)

然后遍历查询，当[物料代码]有变化时在新建的结果表中新增一行，当[物料代码]无变化时编辑相应数据（合并记录）

![](/downloads/merge-records-合并逻辑.png)

**源   码**:

**[点此查看代码](https://paste.ubuntu.com/p/sNNSRmJKxP/)**

**代   码**:

[![点击图片查看大图](/downloads/merge-records-代码.png "点击查看大图")](/downloads/merge-records-代码.png)

```vba
Private Sub Command7_Click()
 Dim rs As New ADODB.Recordset
 Dim rsDes As New ADODB.Recordset

 Dim MID As String
 MID = "---------"
 Dim Model As String
 Model = "---------"

 Dim ModelQty As Long
 Dim strModel As String

 Dim MIDn As Long
 Dim ModelnQty As Long
 Dim strModeln As String
 Dim strModelnQty As String

 CurrentDb.Execute "delete * from tbl物料代码运用机型分析 "
 rsDes.Open "select * from tbl物料代码运用机型分析", CurrentProject.Connection, adOpenKeyset, adLockOptimistic
 rs.Open "select * from qry产品清单汇总", CurrentProject.Connection, adOpenKeyset, adLockOptimistic

 Do While Not rs.EOF

    If MID <> rs("物料代码") Then
        '不同的MID(新物料)，创建一条新的记录
        MID = rs("物料代码")
        Model = rs("机型")

        ModelQty = 1
        strModel = Model

        MIDn = 1
        ModelnQty = 1
        strModeln = Model
        strModelnQty = strModeln & ",1 "

        rsDes.AddNew
        rsDes("物料代码") = MID
        rsDes("图号国标号型号") = rs("图号国标号型号")
        rsDes("名称规格") = rs("名称规格")
        rsDes("运用机型数量") = ModelQty
        rsDes("运用机型") = strModel
        rsDes("总数量") = MIDn
        rsDes("各机型数量") = strModelnQty
    ElseIf Model <> rs("机型") Then
        '同MID，不同model（新机型）
        Model = rs("机型")

        ModelQty = ModelQty + 1
        strModel = strModel & " | " & Model

        MIDn = MIDn + 1
        ModelnQty = 1
        strModeln = strModelnQty & " | " & Model
        strModelnQty = strModeln & ",1"

        rsDes("运用机型数量") = ModelQty
        rsDes("运用机型") = strModel
        rsDes("总数量") = MIDn
        rsDes("各机型数量") = strModelnQty
    Else
        '同MID，同model(没新东西)

        MIDn = MIDn + 1
        ModelnQty = ModelnQty + 1
        strModelnQty = strModeln & "," & ModelnQty

        rsDes("总数量") = MIDn
        rsDes("各机型数量") = strModelnQty
    End If

    rsDes.Update
    rs.MoveNext
 Loop
 rs.Close
 rsDes.Close
 DoCmd.OpenTable "tbl物料代码运用机型分析", , acReadOnly
End Sub
```

来源：http://www.accessoft.com/blog/article-show.asp?userid=81743&Id=20135
