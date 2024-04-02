async function onPageLoad(){
    const roomsJsonArray = await getRoomsRequest();
    console.log(roomsJsonArray);
}