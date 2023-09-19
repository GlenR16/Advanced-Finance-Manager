
export function Tax(income,slabs=[[250000,0],[500000,0.05],[1000000,0.20],[Number.POSITIVE_INFINITY,0.30]]){
    var prev = 0;
    var tax = 0;
    for (let i of slabs){
        if (income < i[0] || i[0] == null ){
            tax += ((income-prev) * i[1]) + (((income-prev) * i[1])*0.04)
            break
        }
        else if (income > i[0]){
            tax += ((i[0]-prev) * i[1]) + (((i[0]-prev) * i[1])*0.04)
        }
        prev = i[0]
    }
    if (income < 5000000){
        return tax
    }
    else if (income > 5000000 && income < 10000000){
        return (tax + (tax*0.1))
    }
    else if (income > 10000000 && income < 20000000){
        return (tax + (tax*0.15))
    }
    else if (income > 20000000 && income < 50000000){
        return (tax + (tax*0.25))
    }
    else {
        return (tax + (tax*0.37))
    }
}

export function CompoundIncrement(income,increment=0,year=0){
    return income*Math.pow((1 + increment/100),Math.abs(year) )
}