import { useIncome } from "../contexts/IncomeProvider";
import { useExpense } from "../contexts/ExpenseProvider";
import { useInvestment } from "../contexts/InvestmentProvider";
import { useSetting } from "../contexts/SettingsProvider";
import { CompoundIncrement, Tax } from "./Calculators";

export function CumulativeIncome(){
    const { income } = useIncome();
    const { expense } = useExpense();
    const { investment } = useInvestment();
    const { settings } = useSetting();

    var output = {}

    var minDate = new Date();
    var maxDate = new Date();
    
    income.concat(expense,investment).forEach((i) => {
        if (i.start && new Date(i.start) < minDate ){
            minDate = new Date(i.start)
        }
        if (i.end && new Date(i.end) > maxDate ){
            maxDate = new Date(i.end)
            maxDate.setMonth(maxDate.getMonth() + 1)
        }
    })
    
    if (minDate.toDateString() == maxDate.toDateString()){
        maxDate.setMonth(maxDate.getMonth()+20);
    }

    for(let j=new Date(minDate); j <= maxDate ;j.setMonth(j.getMonth()+1)){
        output[j.toISOString().slice(0,7)] = 0;
    }


    income.forEach((i) => {
        var endDate = new Date(i.end)
        if (!i.end){
            endDate = maxDate
        }

        var k = 1;
        for(let j=new Date(i.start) ; j <= endDate ; j.setMonth(j.getMonth()+1) ){
            output[j.toISOString().slice(0,7)] += ((CompoundIncrement(i.amount,i.increment,Math.floor(k/13)) - Tax(CompoundIncrement(i.amount,i.increment,Math.floor(k/13))))/12);
            k++;
        }
    })


    investment.forEach((i) => {
        var endDate = new Date(i.end)
        for(let j=new Date(i.start) ; j <= endDate ; j.setMonth(j.getMonth()+1) ){
            output[j.toISOString().slice(0,7)] -= (i.amount/12);
        }
        
    })


    for(let j=new Date(minDate) ; j <=maxDate ; j.setMonth(j.getMonth()+1) ){
        output[j.toISOString().slice(0,7)] -= Tax(output[j.toISOString().slice(0,7)]*12) / 12;
    }
    
    investment.forEach((i) => {
        var maturity = new Date(i.end)
        maturity.setMonth(new Date(i.end).getMonth()-1) 
        output[maturity.toISOString().slice(0,7)] += CompoundIncrement(i.amount, i.interest , new Date(i.end).getFullYear() - new Date(i.start).getFullYear())
    })

    expense.forEach((i) => {
        var endDate = new Date(i.end)
        if (!i.end && i.recurrence == "YEARLY"){
            endDate = maxDate
        }
        else if (!i.end && i.recurrence == "SINGLE"){
            endDate = new Date(i.start).setMonth(new Date(i.start).getMonth()+1)
        }

        for(let j=new Date(i.start); j <= endDate ;j.setMonth(j.getMonth()+1)){
            output[j.toISOString().slice(0,7)] -= (i.amount/(i.recurrence == "SINGLE"?1:12));
        }
    })

    var prev = 0;
    var i = 1;
    for(let j = minDate ; j <= maxDate ; j.setMonth(j.getMonth()+1)){
        output[j.toISOString().slice(0,7)] += prev;
        if (i%3 == 0){
            output[j.toISOString().slice(0,7)] += (output[j.toISOString().slice(0,7)]*( settings.interest * 3 / 1200));
        }
        i++;
        prev = output[j.toISOString().slice(0,7)];
    }
    

    var keyArray = Object.keys(output);
    keyArray.sort((a,b) => {return new Date(a) - new Date(b)});
    var result = [];
    for (let key of keyArray){
        result.push({date: key , Balance: output[key] })
    }
    
    return result.slice(0,50)
}

export function LiveIncomeSource(){
    const { income } = useIncome();
    const chart2 = []
    
    income.forEach((i) => {
        if ( new Date(i.start) < new Date() && ( !i.end || new Date(i.end) > new Date()) ){
            chart2.push({
                Income: parseFloat((CompoundIncrement(i.amount,i.increment,new Date().getFullYear() - new Date(i.start).getFullYear())).toFixed(2)) ,
                name: i.name
            })
        }
    });

    return chart2
}

export function LiveSheet(){
    const { income } = useIncome();
    const { expense } = useExpense();
    const { investment } = useInvestment();

    var chart3 = [];

    income.forEach((i) => {
        if ( new Date(i.start) < new Date() && ( !i.end || new Date(i.end) > new Date()) ){
            chart3.push({
                name: i.name,
                amount: parseFloat((CompoundIncrement(i.amount,i.increment,new Date().getFullYear() - new Date(i.start).getFullYear())/12).toFixed(2)) ,
                type: "Income"
            })
        }
    });

    investment.forEach((i) => {
        if ( new Date(i.start) < new Date() && ( !i.end || new Date(i.end) > new Date()) ){
            chart3.push({
                name: i.name,
                amount: i.amount,
                type: "Investment"
            })
        }
    });

    expense.forEach((i) => {
        if ( new Date(i.start).getMonth() == new Date().getMonth() && new Date(i.start).getFullYear() == new Date().getFullYear() ){
            chart3.push({
                name: i.name,
                amount: i.recurrence == "SINGLE" ? i.amount:i.amount/12 ,
                type: "Expense"
            })
        }
    });

    return chart3;

}