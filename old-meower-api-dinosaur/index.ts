import { serve } from 'https://deno.land/std@0.142.0/http/server.ts';
import { MongoClient, Collection, Document } from 'https://deno.land/x/mongo@v0.30.0/mod.ts';
import Router from './api.ts';

// declare global variables
declare global {
  var configdb: Collection<Document>
  var usersdb: Collection<Document>
  var netlogdb: Collection<Document>
  var sessionsdb: Collection<Document>
  var oauthappsdb: Collection<Document>
  var postsdb: Collection<Document>
  var messagesdb: Collection<Document>
  var chatsdb: Collection<Document>
}

// invitialize database
const mongo = new MongoClient();
await mongo.connect("mongodb://127.0.0.1:27017");
const db = mongo.database('meowerserver')
window.configdb = db.collection('config')
window.usersdb = db.collection('usersv0')
window.netlogdb = db.collection('netlog')
window.sessionsdb = db.collection('sessions')
window.oauthappsdb = db.collection('oauth')
window.postsdb = db.collection('posts')
window.messagesdb = db.collection('messages')
window.chatsdb = db.collection('chats')

serve((req: Request): Response => Router.handle(req), {
  port: 3000,
});