---
title: "遍历数据库所有表并输出各个表的数据量，有多少条记录"
date: 2023-03-29 11:58:59 +0800
categories: [计算机]
tags: [access]
---

近期写一个小工具，想用以前写的一个工具作模板。数据库已经很大了，想知道是哪个表的数据多删一删。固有此代码。

```vba
Sub CountRecords()
    Dim db As DAO.Database
    Dim tbl As DAO.TableDef
    Dim rst As DAO.Recordset
    Dim strTable As String
    Dim lngCount As Long

    Set db = CurrentDb()

    For Each tbl In db.TableDefs
        If (tbl.Attributes And dbHiddenObject) <> dbHiddenObject Then
            strTable = tbl.Name

            If Left(strTable, 4) <> "MSys" Then
                Set rst = db.OpenRecordset(strTable)
                lngCount = rst.RecordCount

                Debug.Print strTable & ": " & lngCount

                rst.Close
            End If
        End If
    Next tbl

    Set rst = Nothing
    Set tbl = Nothing
    Set db = Nothing
End Sub
```

**注：**此代码为ai完成。实测可用。

[![点击图片查看大图](http://www.accessoft.com/article_attached/2023/image/202303/202303291157368623.png "点击查看大图")](http://www.accessoft.com/article_attached/2023/image/202303/202303291157368623.png)

[![点击图片查看大图](http://www.accessoft.com/article_attached/2023/image/202303/202303291318516063.png "点击查看大图")](http://www.accessoft.com/article_attached/2023/image/202303/202303291318516063.png)

来源：http://www.accessoft.com/blog/article-show.asp?userid=81743&Id=20694
