var tblhrmdailyrosterattendance = require("../models/tbl_hrm_daily_roster_attendance")
const sequalize = require("../common/dbconfig").sequelize;
const Sequalize = require("sequelize");


exports.userAttendance = (req, res, next) => {
        tblhrmdailyrosterattendance = tblhrmdailyrosterattendance(sequalize, Sequalize)
        tblhrmdailyrosterattendance.findAll({
          where:{
          emp_id:req.body.Emp_Id
    },
          offset:(req.body.Page_No-1)*20,limit:20,
      }).then(users => {
        list=[]
          for(i=0;i<20;i++){
          list.push({emp_id:users[i].emp_id,date:users[i].date,checkin_time:users[i].checkin_time,checkout_time:users[i].checkout_time,attendance_type:users[i].attendance_type,absent_type:users[i].absent_type,comments:users[i].comments,duty_hour:new Date(users[i].checkin_time).getHours()-new Date(users[i].checkout_time).getHours()})

        }
          res.json(list);

        });
}
