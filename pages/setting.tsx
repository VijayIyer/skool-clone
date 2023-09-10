import Layout, {AltLayout} from "@/components/Layout";
import type { ReactElement } from 'react';
import type { PageWithoutSearchBar } from './_app';

const Setting: PageWithoutSearchBar = () => {
    return <p>this is setting page</p>
}

Setting.getLayout = function getLayout(page: ReactElement) {
    return (
        <AltLayout>
            {page}
        </AltLayout>
    )
}

export default Setting;