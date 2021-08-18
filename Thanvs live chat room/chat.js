class Chatroom{
    constructor(room, username){
        this.username = username;
        this.room = room;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addMsg(message){
        
        const now = new Date();

        const chat = {
            username: this.username,
            room: this.room,
            message:message,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        const response = await this.chats.add(chat);
        return response;
    };

    getChats(callback){
        
        this.unsubs = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot( snapshot => {
            snapshot.docChanges().forEach( change => {
                if(change.type === 'added'){
                    callback(change.doc.data());
                };
            });
        }); 
    };

    updateName(username){
        this.username = username;
        localStorage.setItem('username' , username);
    }

    updateRoom(room){
        this.room = room;
        if(this.unsubs){
            this.unsubs();
        }
    }

};



