import { Command } from "commander"

const program = new Command()

program.option('--mode <mode>', 'Modo de trabajo de mi server', 'production').parse()

export default program

//node src/process.js -d -p 3000 --mode development -u root --letters abc