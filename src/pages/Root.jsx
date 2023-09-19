import { NameProvider } from '../contexts/NameProvider';
import { IncomeProvider } from '../contexts/IncomeProvider';
import { ExpenseProvider } from '../contexts/ExpenseProvider';
import { InvestmentProvider } from '../contexts/InvestmentProvider';
import { SettingsProvider } from '../contexts/SettingsProvider';
import { ThemeProvider } from '../contexts/ThemeProvider';
import Wrapper from './Wrapper';

export default function Root(){
    
    return (
        <ThemeProvider>
            <NameProvider>
                <IncomeProvider>
                    <ExpenseProvider>
                        <InvestmentProvider>
                            <SettingsProvider>
                                <Wrapper />
                            </SettingsProvider>
                        </InvestmentProvider>
                    </ExpenseProvider>
                </IncomeProvider>
            </NameProvider>
        </ThemeProvider>
    )
}