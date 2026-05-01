const fs = require('fs');

// ^ This is Read File Synchronusly 
try {
    // ^Read File
    const ReadData = fs.readFileSync("./data.text" , "UTF8");
    console.log(ReadData);

    // ^Wriite File 
    const WriteDate = "Kuldeep";
    
    try {
        // ! it will override file content
        fs.writeFileSync("./data.text", ReadData + WriteDate);
    } catch (error) {
        console.log(error)
    }
} catch (error) {
    console.log(error);
}

