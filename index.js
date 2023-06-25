let localStream;
let ChatText = '';
const st_option = {
  video: true,
  audio: {
      sampleRate: 44100
  }
}
document.getElementById('btn00').onclick = () => {

navigator.mediaDevices.getDisplayMedia(st_option)
  .then( stream => {
  const v = document.getElementById('myV');
  v.srcObject = stream;
  v.play();
  localStream = stream;
  document.getElementById('shareID').textContent = "接続ID: " + peer.id;
  let mv = document.getElementById('myV')
  mv.setAttribute("autoplay",'')
  mv.setAttribute("playsinline",'')
  mv.setAttribute("controls",'')
  document.getElementById('shareV').style.display = 'none'
})

}
const peer = new Peer({key: 'b2ec5df0-85b1-4e32-965f-072a7379a325'});

document.getElementById('btn').onclick = () => {

  let idv = document.getElementById('ID').value;
  const ID = idv.replace(' ','');
  const dataConnection = peer.connect(ID);

  const mediaConnection = peer.call(ID, localStream);
    setEventListener(mediaConnection);
  alert(ID + "に接続")
  //alert(peer.id)
    document.getElementById('messageInput').onchange =()=>{
      ChatText = document.getElementById('messageInput').value
    dataConnection.send(ChatText);
    document.getElementById('messageInput').value = '';
    let chatEle = document.createElement('div');
    chatEle.innerHTML = `<div class="chatEle" style="border: 1px solid black;">${ChatText}</div>`
    document.getElementById('chatMessage').appendChild(chatEle);
    }

};

peer.on('connection', (conn) => {
  conn.on('data', (data) => {
    let chatEle = document.createElement('div');
    chatEle.innerHTML = `<div class="chatEle" style="border: 1px solid black;">${data}</div>`
    document.getElementById('chatMessage').appendChild(chatEle);
  });
});

//映像
  // 相手側のやつ
  const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
      const v = document.getElementById('shareV')
      v.srcObject = stream;
      v.play();
      document.getElementById('myV').style.display = 'none'
    });
  }

peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
  });
