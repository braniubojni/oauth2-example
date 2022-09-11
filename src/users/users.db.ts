interface IUser {
  id: string;
  username: string;
  password: string;
  name: string;
}

export class Clients {
  users: IUser[] = [
    { id: '1', username: 'bob', password: 'secret', name: 'Bob Smith' },
    { id: '2', username: 'joe', password: 'password', name: 'Joe Davis' },
  ];

  findById(id: string, done: Function) {
    for (let i = 0, len = this.users.length; i < len; i++) {
      if (this.users[i].id === id) return done(null, this.users[i]);
    }
    return done(new Error('User Not Found'));
  }

  findByUsername(username: string, done: Function) {
    for (let i = 0, len = this.users.length; i < len; i++) {
      if (this.users[i].username === username) return done(null, this.users[i]);
    }
    return done(new Error('User Not Found'));
  }
}

export default new Clients();
