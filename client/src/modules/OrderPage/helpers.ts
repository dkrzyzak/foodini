export const formatPhoneNr = (phoneNr: string) => {
   if (phoneNr.length !== 9) return phoneNr;

   const splitted = [
      phoneNr.slice(0, 3),
      phoneNr.slice(3, 6),
      phoneNr.slice(6, 9),
   ]

   return splitted.join(' ');
}