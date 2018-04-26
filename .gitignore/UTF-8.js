var str = 'a海能达';
var	re = [];
	
for(var i=0; i<str.length; i++){
	var ch = str.charCodeAt(i);
	var st = [];
	do{
		st.push(ch & 0xFF);
		ch = ch >> 8;
	}
	while(ch)
	st.reverse();
	re = re.concat(st);
}
console.log(re);

function stringToByte(str) {  
    var bytes = new Array();  
    var len, c;  
    len = str.length;  
    for(var i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if(c >= 0x010000 && c <= 0x10FFFF) {  
            bytes.push(((c >> 18) & 0x07) | 0xF0);  
            bytes.push(((c >> 12) & 0x3F) | 0x80);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000800 && c <= 0x00FFFF) {  
            bytes.push(((c >> 12) & 0x0F) | 0xE0);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000080 && c <= 0x0007FF) {  
            bytes.push(((c >> 6) & 0x1F) | 0xC0);  
            bytes.push((c & 0x3F) | 0x80);  
        } else {  
            bytes.push(c & 0xFF);  
        }  
    }  
    return bytes;  
}
	
function byteToString(arr) {  
    if(typeof arr === 'string') {  
        return arr;  
    }  
    var str = '',  
        _arr = arr;  
    for(var i = 0; i < _arr.length; i++) {  
        var one = _arr[i].toString(2),  
            v = one.match(/^1+?(?=0)/);  
        if(v && one.length == 8) {  
            var bytesLength = v[0].length;  
            var store = _arr[i].toString(2).slice(7 - bytesLength);  
            for(var st = 1; st < bytesLength; st++) {  
                store += _arr[st + i].toString(2).slice(2);  
            }  
            str += String.fromCharCode(parseInt(store, 2));  
            i += bytesLength - 1;  
        } else {  
            str += String.fromCharCode(_arr[i]);  
        }  
    }  
    return str;  
} 	
	
var byte = stringToByte('海');
console.log(byte);
var str = byteToString(byte);
console.log(str);
	
var str = '海'.charCodeAt(0);// String.fromCharCode(65537);
console.log(str);
	
	
function String2Byte(str){
	var arr = [];
	for(var i=0; i<str.length; i++){
		var charCode = str.charCodeAt(i);
		if(charCode < 0x7F){
			arr.push(charCode)
		}
		else if(charCode >= 0x800 && charCode <= 0xFFFF){
			arr.push((charCode >> 12) | 0xE0);
			arr.push(((charCode >> 6) & 0x3F) | 0x80);
			arr.push((charCode & 0x3F) | 0x80);
		}
	}
	return arr;
}
	
function Byte2String(byte){
	var i = 0;
	var str = '';
	do{
		var head = byte[i] >> 4;
		if(head == 0x0E){
			var c = 0
			c |= ((byte[i] & 0x0F) << 12);
			c |= ((byte[i+1] & 0x3F) << 6);
			c |= (byte[i+2] & 0x3F);
			str += String.fromCharCode(c);
			i += 3;
			continue;
		}
		
		head = byte[i] >> 7;
		if(head == 0x00){
			str += String.fromCharCode(byte[i]);
			i++;
			continue;
		}
	}while(i < byte.length)
	return str;
}
console.log(String2Byte(''))
console.log(Byte2String([]));
