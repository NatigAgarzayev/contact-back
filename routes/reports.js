import { Router } from "express"
import { checkAuth } from "../utils/checkAuth.js"
import { sendReport, getReports, solveReports } from "../controllers/reports.js"
import { adminHere } from "../utils/adminHere.js"
const router = new Router

//send report
router.post('/', checkAuth, sendReport)

//get reports 
router.get('/', adminHere, getReports)

//solve reports
router.delete('/:id', adminHere, solveReports)

export default router