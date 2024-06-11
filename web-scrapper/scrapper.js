const puppeteer = require("puppeteer");

async function monitorPage(url, checkInterval) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let previousContent = "";

  // Função para extrair o conteúdo desejado da página
  const extractContent = async () => {
    await page.goto(url, { waitUntil: "networkidle2" });
    return await page.evaluate(() => {
      // Modifique o seletor para a parte da página que você deseja monitorar
      const articleElements = document.querySelectorAll("p");
      const articleTitles = [];
      articleElements.forEach((element) => {
        articleTitles.push(element.innerText);
      });
      return articleTitles.join(","); // Combine em uma única string para comparação
    });
  };

  // Função para verificar mudanças
  const checkChanges = async () => {
    const currentContent = await extractContent();

    if (currentContent !== previousContent) {
      console.log("Novo conteúdo detectado:");
      console.log(currentContent);
      previousContent = currentContent;
    } else {
      console.log("Sem mudanças.");
    }
  };

  // Executa a verificação inicial imediatamente
  await checkChanges();

  // Loop de verificação a cada intervalo definido
  setInterval(checkChanges, checkInterval);
}

// URL do site e intervalo de verificação em milissegundos
const url = "https://www.lipsum.com/";
const checkInterval = 3600000; // Verifica a cada 1 hora

monitorPage(url, checkInterval);
