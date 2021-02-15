/*
Convert the given number into a roman numeral.
All roman numerals answers should be provided in upper-case.*/

function convertToRoman(num) {
    let units={1:"I",5:"V",10:"X",50:"L",100:"C",500:"D",1000:"M"};
    let [a,b]=[5,1];
    let arr=[];
    let flag=0;
    while(a<5001){
        for(let i=num%a; i>0; i-=b){
            if(a<1001 && i/b==4){
                if((num%(a/b==5?a*2:a*5))/b!=9){
                    arr.unshift(units[a]);
                    arr.unshift(units[b]);
                }
                else{
                    arr.unshift(units[a/b==5?a*2:a*5]);
                    arr.unshift(units[b]);
                    flag=1;
                }
                break;
            }
            arr.unshift(units[b]);
            if(flag==1){
                arr.shift();
                flag=0;
            }
        }
        num-=num%a;
        [a,b]=[a/b==5?a*2:a*5,a]
    }

    return arr.join("");
}

console.log(convertToRoman(4999));
