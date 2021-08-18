const list = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateName = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

newChatForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const message = newChatForm.message.value.trim();

    chatroom.addMsg(message)
        .then(() => newChatForm.reset() )
        .catch(err => console.log(err));
});

newNameForm.addEventListener('submit', e => {

    e.preventDefault();

    const newName = newNameForm.name.value.trim();

    chatroom.updateName(newName);

    newNameForm.reset();

    updateName.innerText = `Your name was updated to ${newName}`;

    setTimeout(()=>{
        updateName.innerText = ''
    }, 2000);
})

rooms.addEventListener('click' , e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

const username = localStorage.username ? localStorage.username : 'Anonymous'

const chatroom = new Chatroom('general', username);
const chatUI = new ChatUI(list);

chatroom.getChats(data => {
    chatUI.render(data);
});

