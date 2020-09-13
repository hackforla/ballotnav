import pandas as pd
import PyPDF2

pdf_file = open('pdf/Town-Clerks-List.pdf', 'rb')
pdfReader = PyPDF2.PdfFileReader(pdf_file)

dfs = []
for i in range(1, 15):
    pageObj = pdfReader.getPage(i)
    page1 = pageObj.extractText()
    page1 = page1[:-16]
    page1 = page1.replace('\n \n', ' ')
    page1 = page1.replace('\n   \n', ' ')
    page1 = page1.replace('\n x\n', ' ')
    page1 = page1.replace(' \n', '')
    page1 = page1.replace(',', ' ')
    page1 = page1.replace('\n      ', ', ')
    page1 = page1.replace('\n ', ' ')
    page1 = page1.replace('\n', ', ')
    page1 = page1.replace('    ', ', ')
    page1 = page1.replace('.org,', '.org, break')
    page1 = page1.replace('.net, ', '.net, break')
    page1 = page1.replace('.gov, ', '.gov, break')
    page1 = page1.replace('.com, ', '.com, break')
    page1 = page1.replace('.us, ', '.us, break')
    page1 = page1.replace(', ,', ',')
    page1 = page1.split(' break')
    page1
    for i in range(1,len(page1)):
        page1[i] = page1[i][2:]
    dfs += page1

df = pd.DataFrame([sub.split(",") for sub in dfs])
df.to_csv('Connecticut.csv')