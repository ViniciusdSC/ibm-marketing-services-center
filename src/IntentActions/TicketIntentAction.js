export default {
  create_ticket (output, socket) {
    console.log('create_ticket');
  },
  search_ticket (output, socket) {
    console.log('search_ticket');
  },
  default (output, socket) {
    socket.emit('message', output.generic.text);
  }
}
