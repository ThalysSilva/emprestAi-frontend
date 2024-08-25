import { Pressable, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const CustomButton = styled(Pressable)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border: 1px solid ${({ theme }) => theme.COLORS.HEADER_BG};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: 12px;
  gap: 8px;
  flex-wrap: nowrap;
  flex: 1;
  border-radius: 99px;
  justify-content: center;
  align-items: center;
`;

export const CustomButtonText = styled(Text)`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.ROBOTO_SEMIBOLD};
  color: ${({ theme }) => theme.COLORS.HEADER_BG};
`;
