const {Builder,By,Key,WebElement} = require ("selenium-webdriver");

async function example(){
    
    //launch the browser
    let driver = await new Builder().forBrowser("chrome").build();
    let driver2 = await new Builder().forBrowser("chrome").build();
   // chrome_options = Options() chrome_options.add_experimental_option("detach", True)

    //navigate to our aplication
    await driver.get("http://localhost:3000/")

    await driver2.get("http://localhost:3000/")
    // add a todo
    await driver.findElement(By.xpath("/html/body/div/div/div/header/input[1]")).sendKeys("123456789");

    await driver.findElement(By.xpath("/html/body/div/div/div/header/input[2]")).sendKeys("Hola123");

    await driver.findElement(By.xpath("/html/body/div/div/div/header/button")).click();
}

example()