// Load Puppeteer
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL của trang web cần chụp ảnh
const url = 'http://localhost:5173/';
const outputPath = path.join(__dirname, '../public/images/edulight-lms-landing.png');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: null
  });

  try {
    console.log('Opening new page...');
    const page = await browser.newPage();
    
    // Set viewport size (desktop)
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log(`Navigating to ${url}...`);
    // Navigate to the website
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for a moment to ensure everything is loaded
    await page.waitForTimeout(2000);
    
    console.log('Taking screenshot...');
    // Take a screenshot
    await page.screenshot({ 
      path: outputPath,
      fullPage: true
    });
    
    console.log(`Screenshot saved to ${outputPath}`);
  } catch (error) {
    console.error('Error during screenshot capture:', error);
  } finally {
    // Close the browser
    await browser.close();
    console.log('Browser closed.');
  }
})(); 