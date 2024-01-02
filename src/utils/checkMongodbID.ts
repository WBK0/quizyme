export default function checkMongoDBID(id: string){
  if(!id) return false;
  if(id.length !== 24) return false;
  if(!/^[0-9a-fA-F]+$/g.test(id)) return false;
  return true;
}