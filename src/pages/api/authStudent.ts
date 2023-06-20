import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import chrome from 'chrome-aws-lambda';

const authStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      return checkInfoStudents(req, res);
    }
    case 'GET': {
      return getStudentsID(req, res);
    }
  }
};

async function checkInfoStudents(req: NextApiRequest, res: NextApiResponse) {
  const pagePrimary =
    'http://www.portalacademico.uneb.br/PortalSagres/Acesso.aspx';

  const result = req.body;

  const browser = await puppeteer.launch({
    headless: true, //false abre interface gráfica true não abre.
    //headless: chrome.headless,
    defaultViewport: null, //Tira o tamanho padrão 800x600
    //args: ["--disable-setuid-sandbox", "--start-maximized"], //permite que seja uma página http e página maximizada
    args: chrome.args,
    ignoreHTTPSErrors: true,
    executablePath: await chrome.executablePath,
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      'Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10'
    );
    await page.goto(`${pagePrimary}`);
    await page.type(
      '[name="ctl00$PageContent$LoginPanel$UserName"]',
      `${result.matriculation}`
    );
    await page.type(
      '#ctl00_PageContent_LoginPanel_Password',
      `${result.password}`
    );
    await page.click('[type="submit"]');
    await page.waitForNavigation(); //Espera o carregamento da página
    let checkName = await page.evaluate(() => {
      const name = document.querySelector('.usuario-nome')?.innerHTML;
      return {
        name,
      };
    });
    if (!checkName) {
      await page.click('[name="ctl00$btnLogin"]'); //ctl00$btnLogin Se houver algum comunicado na página
      await page.waitForNavigation();
      checkName = await page.evaluate(() => {
        const name = document.querySelector('.usuario-nome')?.innerHTML;
        return {
          name,
        };
      });
    }
    await browser.close();
    if (checkName.name != undefined) {
      res.status(200).send({
        name: checkName.name,
      });
    } else {
      return res.status(500).json({
        success: false,
      });
    }
  } catch (err) {
    await browser.close();
    console.log('Erro ao executar => : ', err);
    return res.status(400).json({
      success: false,
    });
  } finally {
    await browser.close();
  }
}

async function getStudentsID(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(200)
    .json({ result: 'Carteirinhas cadastradas no banco de dados' });
}

export default authStudent;
