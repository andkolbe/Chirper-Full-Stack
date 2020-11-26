import { Query } from '../';

const all = () => Query('SELECT chirps.*, users.name FROM chirps JOIN users on users.id = chirps.userid;');
const one = (id: number) => Query('SELECT chirps.*, users.name FROM chirps JOIN users on users.id WHERE chirps.id = ?', [id])
const insert = (userid: number, content: string, location: string) => Query('INSERT INTO chirps (userid, content, location) VALUE (?, ?, ?)', [userid, content, location]);
const update = (id: number, content: string, location: string) => Query('UPDATE chirps SET content = ?, location = ? WHERE id = ?', [content, location, id]);
const destroy = (id: number) => Query('DELETE FROM chirps WHERE id = ?', [id]);
 
export default { // you can import this page into another page and it will bring all of its properties with it
    all,
    one,
    insert,
    update,
    destroy
}