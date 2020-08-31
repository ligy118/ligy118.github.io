function sum(type) {
    console.log("click"+String(type))
    switch (type) {
        case 0:
            for (var k = 1; k < 7; k++) {
                column_counter(k);

            }
            break ;
        default:
            column_counter(type)


    }
}

function column_counter(row) {
    var sum = 0;
    for (i = 2; i <= 7; i++) {
        temp = document.getElementById("a" + String(row) + i)
        sum += isNaN(Number(temp.value)) ? 0: Number(temp.value)
   //     document.getElementById("t3").innerHTML = row+" row i "+i;

    }
    console.log(sum);
    document.getElementById("a" + String(row) + "1").innerHTML = sum;
    document.getElementById("a" + String(row) + "1").value = sum
}

function jshj(){
    sum(0);
}
/*
function test(t){
    document.getElementById("tt").innerHTML = t ;
    document.getElementById("t2").value = 6 ;
    ttttt = document.getElementById("b51") ;
    document.getElementById("t3").innerHTML =Number(ttttt.value) ;
}
*/
function bidui(bd){
    sum(0);
    twqxh= document.getElementById("wqxh");
    var wqxh=isNaN(Number(twqxh.value)) ? 0: Number(twqxh.value);
    //用数组表示b表格
    var b = [];
    //b表格初始化
    for (var i = 0;i < 110;i++){b[i]=0;}
    

    for(var i=1;i<9;i++){
        temp3 = document.getElementById("a" + i + "1") 
        b[i*10+2]=isNaN(Number(temp3.value)) ? 0: Number(temp3.value);
    }
    for(var i=1;i<9;i++){
        temp1 = document.getElementById("b" + i + "1") 
        temp4 = document.getElementById("b" + i + "4") 
        b[i*10+1]=isNaN(Number(temp1.value)) ? 0: Number(temp1.value);
        b[i*10+4]=isNaN(Number(temp4.value)) ? 0: Number(temp4.value);
    } 
    
    //额外攻击力
    b[13]=b[12]+b[22]*(wqxh+wqxh*b[32]+b[42]);
    b[15]=b[12]+b[14]+b[22]*(wqxh+wqxh*b[32]+b[42]);
    //武器攻击力
    b[23]=b[12]+b[22]*(wqxh+wqxh*b[32]+b[42]);
    b[25]=b[12]+(b[22]+b[24])*(wqxh+wqxh*b[32]+b[42]);
    //武器攻击力%
    b[33]=b[12]+b[22]*(wqxh+wqxh*b[32]+b[42]);  
    b[35]=b[12]+b[22]*(wqxh+wqxh*(b[32]+b[34])+b[42]);  
    //战术攻
    b[43]=b[12]+b[22]*(wqxh+wqxh*b[32]+b[42]);    
    b[45]=b[12]+b[22]*(wqxh+wqxh*b[32]+b[42]+b[44]); 
    //攻击力倍率
    b[53]=b[52];
    b[55]=b[52]+b[54];
    //持续伤害
    b[63]=1+b[62];
    b[65]=1+b[62]+b[64];
    //燃烧层数
    b[73]=b[72];
    b[75]=b[72]+b[74];
    //爆炸因数
    b[83]=b[82];
    b[85]=b[82]+b[84]; 
    //联合比对
    var tt1=[],tt2=[];
    b[93]=1;
    b[95]=1;
    for(var i=1;i<9;i++){
        tt1=(b[i*10+1]==1)?b[i*10+3]:1;
        tt2=(b[i*10+1]==1)?b[i*10+5]:1;
        b[93]=b[93]*tt1;
        b[95]=b[95]*tt2;
    }
    //变化
    for(var i=1;i<10;i++){
        var dd=b[i*10+5]-b[i*10+3];
        b[i*10+6]=dd/b[i*10+3];
    }
    //显示
    for(var i=1;i<10;i++){
        document.getElementById("b" + i+ "3").value = b[i*10+3];
        document.getElementById("b" + i+ "5").value = b[i*10+5];
        document.getElementById("b" + i+ "6").value = b[i*10+6];
    }
     

}
