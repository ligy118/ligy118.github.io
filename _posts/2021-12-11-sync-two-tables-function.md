---
title: "“同步两个表部分记录”函数"
date: 2021-12-11 13:49:51 +0800
categories: [计算机]
tags: [access]
---

在用[**盟威Access快速开发****平台**](http://www.accessgood.com)的GetParamete()函数时遇到了个问题

> # GetParameter 函数

> ### 简介

> 从客户端或服务端的参数表中取得参数。

> ## 语法

> GetParameter (ParameterName[, DataType][, DefaultValue][, LowerLimit][, UpperLimit][, OnServer])

> ### 输入参数

> | 参数名称 | 必需/可选 | 数据类型 | 说明 |
> | --- | --- | --- | --- |
> | ParameterName | 必需 | String | 参数名称。 |
> | DataType | 可选 | DataTypeEnum | 数据类型。缺省时默认为 dbText。只能是 dbBoolean、dbByte、dbInteger、dbLong、dbSingle、dbDouble、dbDecimal、dbCurrency、dbDate、dbText、dbMemo中的一个，其它值无效。 |
> | DefaultValue | 可选 | Variant | 取不到参数时返回的默认值。缺省时默认为空字符串（""）。 |
> | LowerLimit | 可选 | Variant | 如果参数的数据类型是数字，限制其最小下限。缺省时默认不予限制。 |
> | UpperLimit | 可选 | Variant | 如果参数的数据类型是数字，限制其最大上限。缺省时默认不予限制。 |
> | OnServer | 可选 | Boolean | 为 True 表示从服务端参数表中取，为 False 表示从客户端参数表取，缺省时默认为 False。 |

> ## 返回值

> 如果取不到或发生错误时返回 DefaultValue 指定的默认值，否则返回取到的根据不同 DataType 返回的不同的 Variant 子类型的参数值。

OnServer缺省时默认为FALSE，相从date取数需要GetParameter (ParameterName, , , , , TRUE]) 这样用，但在控件来源中连续参数缺省会报错，如下图：

[![点击图片查看大图](http://www.accessoft.com/article_attached/2021/image/202112/202112111400350534.png "点击查看大图")](http://www.accessoft.com/article_attached/2021/image/202112/202112111400350534.png)

      为了能在控件来源中使用GetParameter得到date中的数据，取了个巧，main中的SysLocalParameters 表我也创建了一样的记录，当需要从main中取数时，先同步到main中，在用GetParameter (ParameterName)。

为了减轻同步到main时的工作量，写了两个函数。

**示   例**:

![](http://www.accessoft.com/images/download.gif)[**点击下载此附件**](http://www.accessoft.com/article_attached/2021/file/202112/202112111347499819.zip)

同步一条记录:

```vba
Function updateOneUMParameter(tempParameterName As String) As Boolean
On Error GoTo ErrorHandler
    Dim tempValue As String
    tempValue = DLookup("Value", "Sys_ServerParameters", "ParameterName = '" & tempParameterName & "'")
    DoCmd.SetWarnings False
    DoCmd.RunSQL "Update SysLocalParameters  SET SysLocalParameters.[Value] = '" & tempValue & "' Where [SysLocalParameters].[ParameterName] = '" & tempParameterName & "'"
    'Debug.Print ("Update SysLocalParameters  SET SysLocalParameters.[Value] = '" & tempValue & "' Where [SysLocalParameters].[ParameterName] = '" & tempParameterName & "'")
    DoCmd.SetWarnings True
    updateOneUMParameter = True
    Exit Function

ErrorHandler:
    updateOneUMParameter = False
    Exit Function

End Function
```

[![点击图片查看大图](http://www.accessoft.com/article_attached/2021/image/202112/202112111342247045.png "点击查看大图")](http://www.accessoft.com/article_attached/2021/image/202112/202112111342247045.png)

同步多条记录:

```vba
Function updateAllUMParameter() As Boolean
On Error GoTo ErrorHandler
    Dim ParameterNamen() As String
    ParameterNamen() = Split("aFouceDate,aLastDate,aLastInprocessDate,aLastReserveDate", ",")

    Dim n As Long
    Dim ParameterNamenCount As Long
    ParameterNamenCount = UBound(ParameterNamen) - LBound(ParameterNamen)
    For n = 0 To ParameterNamenCount
        Dim tempParameterName As String
        tempParameterName = ParameterNamen(n)
        Dim tempValue As String
        tempValue = DLookup("Value", "Sys_ServerParameters", "ParameterName = '" & tempParameterName & "'")
        DoCmd.SetWarnings False
        DoCmd.RunSQL "Update SysLocalParameters  SET SysLocalParameters.[Value] = '" & tempValue & "' Where [SysLocalParameters].[ParameterName] = '" & tempParameterName & "'"
        'Debug.Print ("Update SysLocalParameters  SET SysLocalParameters.[Value] = '" & tempValue & "' Where [SysLocalParameters].[ParameterName] = '" & tempParameterName & "'")
        DoCmd.SetWarnings True
    Next n
    updateAllUMParameter = True
    Exit Function

ErrorHandler:
    updateAllUMParameter = False
    Exit Function

End Function
```

[![点击图片查看大图](http://www.accessoft.com/article_attached/2021/image/202112/202112111342485345.png "点击查看大图")](http://www.accessoft.com/article_attached/2021/image/202112/202112111342485345.png)

同步单条记录用法：

call updateAllUMParameter(要同步的记录)

同步多条记录用法：

```vba
ParameterNamen() = Split("aFouceDate,aLastDate,aLastInprocessDate,aLastReserveDate", ",")
```

在以上语句中定义要同步的记录：

call updateAllUMParameter()

**使用举例**:

[![点击图片查看大图](http://www.accessoft.com/article_attached/2021/image/202112/202112111348273977.png "点击查看大图")](http://www.accessoft.com/article_attached/2021/image/202112/202112111348273977.png)

[![点击图片查看大图](http://www.accessoft.com/article_attached/2021/image/202112/202112111348366080.png "点击查看大图")](http://www.accessoft.com/article_attached/2021/image/202112/202112111348366080.png)

来源：http://www.accessoft.com/blog/article-show.asp?userid=81743&Id=20127
