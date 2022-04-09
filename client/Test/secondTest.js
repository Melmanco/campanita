const {Builder,By,Key,WebElement} = require ("selenium-webdriver");

async function example(){
    
    //launch the browser
    let driver = await new Builder().forBrowser("chrome").build();

   // chrome_options = Options() chrome_options.add_experimental_option("detach", True)

    //navigate to our aplication
    await driver.get("http://localhost:3000/")


    // add a todo
    await driver.findElement(By.xpath("/html/body/div/div/div/header/input[1]")).sendKeys("123456789");

    await driver.findElement(By.xpath("/html/body/div/div/div/header/input[2]")).sendKeys("Hola123");

    await driver.findElement(By.xpath("/html/body/div/div/div/header/button")).click();

    await driver.manage().window().maximize();

    await driver.findElement(By.xpath("/html/body/div/div/div[1]/div[2]/nav/div/div/ul/li[5]")).click();

    await driver.findElement(By.xpath("/html/body/div/div/div[2]/div[4]/div[1]/input")).sendKeys("texto de prueba");

    await driver.findElement(By.xpath("/html/body/div/div/div[2]/div[4]/div[1]/div/div/div/input")).sendKeys("09/04/2022",Key.RETURN);


    await driver.findElement(By.xpath("/html/body/div/div/div[2]/div[4]/div[1]/button[1]")).click();


    await driver.findElement(By.xpath("/html/body/div[2]/div/div[4]/div[2]/button")).click();



}

example()