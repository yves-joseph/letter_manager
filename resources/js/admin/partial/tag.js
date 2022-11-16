import Tagify from '@yaireo/tagify';

export default function tagView() {
    const tags = document.getElementsByClassName('___tag-fields');

    for (let i = 0; i < tags.length; i++) {
        const ___tag = tags[i];
        new Tagify(___tag, {
            userInput: ___tag.dataset.userInput === undefined
        });
    }
}
