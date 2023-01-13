import React from "react";
import PageLayout from "../../layouts/PageLayout";
import { Box, Icon, Text } from "../../components/elements";

export default function BlankPage() {
    return (
        <PageLayout>
            <Box className="mc-blank">
                <Icon type="extension" />
                <h1>Welcome To Miracle Billing Mgt System</h1>
                <Text>Work In Progress</Text>
            </Box>
        </PageLayout>
    )
}