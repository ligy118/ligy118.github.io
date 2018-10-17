---
layout: post
title: "arduino记不住打出来一目了然的知识点"
---

1. 引脚

   1. 模拟输入GPIO：A0-A5
   2. 模拟输出（波浪）：3,5,6,9,10,11
   3. 数字（可输入可输出）GPIO：2-13

2. 关键字

   | bool变量                | boolean                      | 声明数字针脚类型 | pinMode<br />(int,I/O)       | 数字写         | digitalWrite<br />(1-13/LED,H/L) |
   | ----------------------- | ---------------------------- | ---------------- | :--------------------------- | -------------- | -------------------------------- |
   | 模拟写                  | analogWrite<br />(int,int)   | 模拟读           | analogRead<br />(int,int)    | 数字读         | digitalRead(int,int)             |
   | 毫秒暂停                | delay(int)                   | 微秒暂停         | delayMicrose<br />conds(int) | 串口通信波特率 | Serial.begin(int)                |
   | 串口写                  | Serial.println<br />(string) | 串口写后换行     | Serial.print<br />(strings)  | 串口读         | Serial.raed()                    |
   | 串口是否收到数据        | Serial.available()           | 设置随机池       | random<br />Seed(int)        | 随机数         | random(int)                      |
   | 压电扬声器发生          | tone(int,int,int)            | 关闭扬声器       | noTone(int)                  | 比例调整       | map(int,int,int,int)             |
   | 数字输入引脚变为*的时间 | pulseln(int,H/L)             |                  |                              |                |                                  |

3. 输入引脚都会有浮空，需要下拉或上拉

4. 控制模拟引脚输入输出不需要声明，直接用

5. 模拟输出0-255，模拟输入0-1023

6. 电源和接地不能直连

   1. 电源和LOW的输出不能直连
   2. 输出和输入？
   3. 模拟输入？

7. 名词结束

   1. PWM：频宽调制，模拟输出的实现方法

8. 色环电阻

   1. 有色环的一段向左

9. long比ing大

10. HC-SR54速度29.1 cm/ms

    l=t/29.1/2=t/58.2