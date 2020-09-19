import requests
import json

ids = [
 'localityId=ff00b38a-2402-4770-8148-51dd9ec27c7e',
 'localityId=efebccfd-dd66-4300-bf0e-e6286fb6c0d3',
 'localityId=8f1f169c-60a4-4c93-852f-f0cdd2b8b9da',
 'localityId=aaa95292-0bac-4e95-8fd3-f2ad22ef1bbf',
 'localityId=80072138-ac56-4cf7-ac23-253b776b7ba2',
 'localityId=b9c154d9-a4b1-49b5-a324-c25a53543477',
 'localityId=69697c4a-175a-4969-8388-eed62f3fa815',
 'localityId=cbf3f98f-8a05-4701-afde-efe7cb73f215',
 'localityId=2e309739-964a-4fe0-bb26-d89e43838d98',
 'localityId=0a13f6bc-616f-4a2f-b7fb-c3a3cc6089ca',
 'localityId=d36acedc-c0b5-40c0-8441-f5555624cce4',
 'localityId=88f727af-001d-4b7b-b758-7d744fdd0ac5',
 'localityId=737d4736-eac1-4e4b-b24a-a177958c2e2c',
 'localityId=cc98e41d-9d12-4996-b4e0-921086cca483',
 'localityId=a6fdec08-376a-4020-92a6-d4a9aba51067',
 'localityId=f9043bce-6716-4606-bb2e-fbecdc82b418',
 'localityId=97e451af-4e8f-4fea-b814-39c93d7bb47a',
 'localityId=87a4de75-1058-45c1-9032-be18e1fef95b',
 'localityId=1e68508d-ad9a-4ec1-a43f-be1788bc4a9a',
 'localityId=259c0ad6-2f80-4717-9003-d5fe5a299bcd',
 'localityId=fd2117fe-6c42-47c3-880b-e0d14d12e3b5',
 'localityId=ab273c6a-0123-4f0d-a11b-2557ee81327c',
 'localityId=b2bc5358-226c-4bbb-aadc-df3a228a84c1',
 'localityId=de494431-f21f-47c5-bbcc-c3f82b45bee3',
 'localityId=4557dd3d-03e7-47ed-9bf6-6f4cebe3b214',
 'localityId=ee8d1a36-fd91-430c-afa3-00d5a56a10cc',
 'localityId=9e30418f-a81a-489d-84ce-ad829f7298bd',
 'localityId=7cfadfbe-7d11-4abb-aeeb-43b495ebc984',
 'localityId=640187ca-e6f9-4a2a-90cc-beebaabf4c67',
 'localityId=92087bb8-a8e8-40dc-804c-3c9b9113a8cf',
 'localityId=49c8e9cd-b18d-445a-b1b5-1171807c820d',
 'localityId=a2271391-3265-452a-8c08-d7a257fd2df8',
 'localityId=ce6c7541-bce7-441b-8e4b-8b0d09f9b5cf',
 'localityId=a32ec932-40f1-4522-bb88-417133232374',
 'localityId=00c47a07-a64d-4cb2-b9c8-c436db22adde',
 'localityId=70dc22ad-9515-469d-840a-f7187f6f03fa',
 'localityId=91e40bf2-a3a9-4350-b912-07e79b47389d',
 'localityId=a4542c27-89b1-44de-a345-ce928d2b22cb',
 'localityId=91e34b32-9426-4e6a-abd3-b14efd9cb233',
 'localityId=0861f5ae-35ef-4ab2-889b-7a97a6be5112',
 'localityId=eccc37d6-2f46-4600-86cc-7540220fea1d',
 'localityId=454fd305-fa46-4c8b-8698-9b9cb4685497',
 'localityId=cdefef11-9ae1-494b-9110-656cbccb0694',
 'localityId=96da194e-ac00-4e5b-a03c-702ea2eb559d',
 'localityId=0fb4ca58-2374-4222-a100-1c06abcfb0d9',
 'localityId=b403e296-d73e-46a6-9a25-92a505cf74be',
 'localityId=d1530b6a-f48a-4c03-a20e-1eb187401baa',
 'localityId=23045271-dac6-48b4-8ad9-2b8e59706323',
 'localityId=3f0ca0f1-bcda-4bf3-98e8-33a1789a28e5',
 'localityId=9f1d4305-5ad6-43f6-b22c-cc07f4bc4143',
 'localityId=73507e15-2e8d-4767-a96f-f42535fcd578',
 'localityId=a44bcee1-b6a9-4a95-8ef7-0351b96240fe',
 'localityId=deb25fed-0e01-46a7-8dae-d07539e52b77',
 'localityId=9e3e0feb-20a7-4957-97e7-810edc83b31f',
 'localityId=b1b72ed5-940e-47af-9543-8d94cd2b1b46',
 'localityId=82055ac8-c887-4f26-b34d-9d176f3391b1',
 'localityId=64d72b50-ab7c-4735-bf7e-8e01f5d8b32e',
 'localityId=8eb03843-41f5-4787-aab6-77bc3e77ec1e',
 'localityId=58c91250-ba85-4deb-94fa-aedad127f410',
 'localityId=e53ae0d6-b6a8-42ab-bce1-5c2c8840a761',
 'localityId=b063f29c-ab36-4435-9c22-be6884216826',
 'localityId=2290d6ab-8b8f-4847-bd0f-3c600353e3b3',
 'localityId=fa2f49f4-f06a-40cb-8fa3-54a63d66e389',
 'localityId=dc1713e4-5034-46fe-8393-3be6c5cf7551',
 'localityId=d26df978-3ec1-499a-8f77-18d0cfaa4eb7',
 'localityId=959d9bcb-ee63-4988-a458-ad6f493c001e',
 'localityId=a1b55ff7-b5ac-4635-ac46-381134140ad5',
 'localityId=b9b0b730-a5d6-4f02-9118-11735e87dbcd',
 'localityId=1fe7ac9f-11bb-4f15-ad81-ceb146e22d0f',
 'localityId=01fd0665-b8b2-4406-84e8-a1f91d41a9a6',
 'localityId=8c24cb4b-040c-4fd1-a444-d513aca8f259',
 'localityId=ccbba98b-a16e-4cea-8af7-64b8a62a8929',
 'localityId=b886be35-dd44-471c-a4fe-9a9385ba3d26',
 'localityId=371cacad-8ce1-4f7c-837b-3f5183193584',
 'localityId=ccd034af-eef4-4032-a6dc-0b240d02a00f',
 'localityId=36f61cfa-cd28-4234-a365-4a402288a5ca',
 'localityId=cfba072c-f21a-4c7d-b4d5-9e1653885ac4',
 'localityId=30064fa6-291b-49e9-915b-1d21cf16b8f7',
 'localityId=58dd0e32-390a-4521-a2f7-6325788e3878',
 'localityId=83b1e99b-2191-42fa-80ea-730dc5cbbc32',
 'localityId=137b594e-5078-400d-9ce9-9153aea77a74',
 'localityId=17a2797c-f3eb-44a5-8151-03f9967c64b7',
 'localityId=089d622f-afc1-4ccd-abfb-e3e9896bdf20',
 'localityId=ad5f45d8-40b0-486e-ac93-c5ed81580f15',
 'localityId=699f8674-4d36-40f3-bec2-a4b5887e5b4a',
 'localityId=3ff23408-a67d-4b16-85aa-c54cf34a6ae4',
 'localityId=0bc68474-3d1a-4bae-a377-b210ff0c8768',
 'localityId=7286a464-644e-4d6a-a20c-a80517ff9c8d',
 'localityId=8d2eb7bb-8bb7-4437-b53e-e00b52f76d24',
 'localityId=267c8caf-1c4d-4e2c-ab10-c6eb25bd1bb9',
 'localityId=91d52ea7-85a6-4885-8714-b9451af0da79',
 'localityId=efbedcba-12fe-44f6-9c49-e1adc6c2423f'
]

results = str()

for i in range(len(ids)):
    headers = {
        'Content-Length': '0',
        'User-Agent': 'https://indianavoters.in.gov/CountyContact/GetCountyDetails'
    }

    response = requests.post(f'https://indianavoters.in.gov/CountyContact/GetCountyDetails?{ids[i]}', headers=headers)
    dict_ = response.json()
    result_text = dict_['result']
    results += result_text

with open("files/Indiana.html", "w") as file:
    file.write(results)

