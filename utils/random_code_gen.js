
export default function random_appointmentId_generator(length) {
  var result           = '';
  var characters       = '0123456789876543210';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 
 var res = 'A'+result;
   return res;
}
