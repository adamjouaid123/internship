'''
import sys
import json
import openpyxl

forms_data = sys.argv[1]

forms = json.loads(forms_data)
print(forms)

def generate_excel(forms):
    workbook = openpyxl.Workbook()
    sheet = workbook.active

    field_names = set()

    for form in forms:
        data = form['data']
        field_names.update(data.keys())

        # Iterate through marriages
        marriages = data.get('marriages', [])
        for marriage in marriages:
            field_names.update(marriage.keys())

            # Iterate through children
            children = marriage.get('childrens', [])
            for child in children:
                field_names.update(child.keys())

    headers = ['Form ID'] + sorted(field_names)
    sheet.append(headers)

    for form in forms:
        form_id = form['form_id']
        data = form['data']
        row_values = [form_id]
        for field_name in sorted(field_names):
            field_value = data.get(field_name, '')
            row_values.append(field_value)

        sheet.append(row_values)

        marriages = data.get('marriages', [])
        for marriage in marriages:
            row_values = [form_id]
            for field_name in sorted(field_names):
                field_value = marriage.get(field_name, '')
                row_values.append(field_value)

            sheet.append(row_values)

            children = marriage.get('childrens', [])
            for child in children:
                row_values = [form_id]
                for field_name in sorted(field_names):
                    field_value = child.get(field_name, '')
                    row_values.append(field_value)

                sheet.append(row_values)

    file_path = './src/data.xlsx'
    workbook.save(file_path)
generate_excel(forms)
'''
print("hello world")