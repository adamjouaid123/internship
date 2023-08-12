import { useContext } from "react";
import { FormDataStoreContext } from "../../stores/FormDataStore";
import RegularAnswer from "../../components/RegularAnswer";

import { Autocomplete, Chip, TextField } from "@mui/material"
import SectionWithTitle from "../../components/SectionWithTitle";

export default function Recommendation() {

    const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)


    const buildPaths = () => {
        let paths = [""];
        const data = formDataStore.data;
        if (data.marriages) {
            data.marriages.forEach((marriage, i) => {
                const path = `marriages[${i}]`
                paths.push(path);
                if (marriage.childrens) {
                    marriage.childrens.forEach((_, j) => {
                        paths.push(`${path}childrens[${j}]`)
                    });
                }
            });
        }
        paths.push("family")
        console.log(paths)
        return paths;
    };

    const extractFirstNames = (data) => {
        const firstNames = [];
        if (data.first_name) {
            firstNames.push(data.first_name);
        }
        if (data.marriages) {
            data.marriages.forEach((marriage) => {
                firstNames.push(marriage.first_name);
                if (marriage.childrens) {
                    marriage.childrens.forEach((child) => {
                        firstNames.push(child.first_name);
                    });
                }
            });
        }
        return firstNames;
    };

    const firstNames = extractFirstNames(formDataStore.data);
    firstNames.push("Family recommendation")
    const paths = buildPaths()

    return (
        <SectionWithTitle title="Recommendation Page">


            {paths.map((path, i) => (
                <div key={i}>
                    <div className="section">
                        <label className="label1">
                            {path === 'family' ? 'Family' : formDataStore.getByNameKey(`${path}first_name`) || 'No name set yet'}
                        </label>
                    </div>

                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={['hello']}
                        defaultValue={formDataStore.getByNameKey(`${path}.recommendations`)}
                        freeSolo
                        onChange={(event, value) => {
                            const newFds = formDataStore.copy()
                            newFds.setNameData(`${path}.recommendations`, value);
                            setFormDataStore(newFds)
                        }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="filled"
                                placeholder="Favorites"
                                className="autocomplete-input"
                            />
                        )}
                        classes={{
                            tag: 'autocomplete-tag',
                            inputRoot: 'autocomplete-input-root',
                            input: 'autocomplete-input',
                            popupIndicator: 'autocomplete-popup-indicator',
                        }}
                    />
                </div>
            ))}

            <SectionWithTitle title="Donor">
                <RegularAnswer text="Who is gonna pay the fees?" name="donor_name" />
            </SectionWithTitle>
        </SectionWithTitle>
    );
}
