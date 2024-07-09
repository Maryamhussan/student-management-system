#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter=10000;
    name:string;
    ID:number;
    Courses:string[];
    balance:number;
    constructor(name:string) {
        this.ID=Student.counter++;
        this.name=name;
        this.Courses=[];
        this.balance=1000;
    }
    enrollincourse(...course:string[]){
this.Courses.push(...course)
    }
    viewbalance(){
        console.log(chalk.bold.green(`Your Balance is : ${this.balance} Rs`));
        
    }
    payfees(fees:number){
        this.balance -= fees
        console.log(chalk.bold.green(`${fees} Rs paid as your fees successfully!`))
    }
    displaystudent(studentid:number){
        console.log(chalk.bold.green(`Student Name : ${this.name}.
ID :${this.ID}.
Courses enrolled : ${this.Courses}.
Total Balance : ${this.balance} Rs.`)
        );
    }
}
class Studentmanagement {
    Students: Student[]
    constructor() {
        this.Students=[];
    }
    addstudent(name:string){
        let student=new Student(name)
        this.Students.push(student)
        console.log(chalk.bold.green(`${name} added successfully!`) )
        console.log(chalk.bold.green(`Student ID : ${student.ID}`) )

    }
    addcourses(studentid:number,...course:string[]){
      let student = this.find_student(studentid)
      if (student) {
        student.enrollincourse(...course)
        console.log(chalk.bold.green(`${student.name} enrolled in ${course} successfully!`))
      } else(
        console.log(chalk.bold.green("Student Not Found! Please enter a correct student Id"))
      )
      }
      viewstudentbalance(studentid:number){
       let student=this.find_student(studentid)
       if (student) {
        student.viewbalance()
       }
       else{
        console.log(chalk.bold.green("Student Not Found! Please enter a correct student Id"))
       }
      }
      pay_fees(studentid:number,fees:number){
        let student=this.find_student(studentid)
        if (student) {
            student.payfees(fees)
        } else {
            console.log(chalk.bold.green("Student Not Found! Please enter a correct student Id"))
        }
      }
      display_status(studentid:number){
        let student=this.find_student(studentid)
        if (student) {
            student.displaystudent(studentid)
        } else {
            console.log(chalk.bold.green("Student Not Found! Please enter a correct student Id"))
        }
      }
      find_student(studentid:number){
        return this.Students.find(std=>std.ID===studentid)
      }
    }
const password="abcd"
    let log=await inquirer.prompt([{
        name:"login",
        type:"password",
        message:"Please enter the password to login :"
    }])
    if (log.login===password) {
        async function main() {
            console.log("-------------------------------------------------")                      
            console.log(chalk.underline.redBright.bgCyan.bold("WELCOME TO ABC SCHOOL'S STUDENT MANAGEMENT SYSTEM"))
            console.log("-------------------------------------------------")
            //console.log("-".repeat(50))
            let studentmanager=new Studentmanagement()
            while(true){
                const choice:any=await inquirer.prompt(
                    {
                    name: "choice",
                    type: "list",
                    message: "Please Select An Option",
                    choices: [
                        "Add Student",
                        "Enroll Student",
                        "View Student Status",
                        "View Student Balance",
                        "Pay Fees",
                        "Exit"]
                });
                
                switch (choice.choice) {
                    case "Add Student":
                        const nameinput= await inquirer.prompt([{
                            name:"name",
                            type:"input",
                            message:"Enter Student Name :",
                        }]);
                        studentmanager.addstudent(nameinput.name);
                    
                        break;
                    case "Enroll Student":
                        let enrollinput=await inquirer.prompt([{
                            name:"studentid",
                            type:"number",
                            message:"Please Enter Student Id :"
                        }])
                        let getcourse=await inquirer.prompt([{
                        name:"course",
                        type:"list",
                        message:"Select The Courses You Want To Enroll In :" ,
                        choices:["English 101","Math 101","CS 101","Enter The Name Of The Course"]
                   }])
                   if (getcourse.course==="Enter The Name Of The Course") {
                    let enter=await inquirer.prompt([
                        {name:"entercourse",
                        type:"input",
                        message:"Enter The Courses You Want To Enroll In :"}
                    ])
                    studentmanager.addcourses(enrollinput.studentid,enter.entercourse)
                   } else {
                    studentmanager.addcourses(enrollinput.studentid,getcourse.course)
                   }
                   
                        break;
                    case "View Student Status":
                    let view_input=await inquirer.prompt([{
                        name:"studentid",
                        type:"number",
                        message:"Enter A Student ID :"
                    }])
                    studentmanager.display_status(view_input.studentid)
                    break;
                    case "Pay Fees":
                     let balance_input=await inquirer.prompt([{
                            name:"studentid",
                            type:"number",
                            message:"Enter A Student ID :"
                        }])
                        let amountinput=await inquirer.prompt([
                    {
                        name:"amount",
                        type:"number",
                        message:"Enter The Amount To Pay :"
                    }]);
                    studentmanager.pay_fees(balance_input.studentid,amountinput.amount)
                    break;
                    case "View Student Balance":
                        let viewbalance=await inquirer.prompt([{
                            name:"studentid",
                            type:"number",
                            message:"Enter A Student ID :"
                        }])
                        studentmanager.viewstudentbalance(viewbalance.studentid)
                        break;
                    case "Exit":
                        console.log("--------------")
                        console.log(chalk.bold.bgCyanBright("PROGRAM CLOSED"));
                        console.log("--------------")
                        process.exit();
                }}}
        main()
        
    } else {
        console.log("------------------")
        console.log(chalk.bold.bgCyanBright("INCORRECT PASSWORD"));
        console.log("------------------")
        
    }

