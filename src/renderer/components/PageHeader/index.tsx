/* eslint-disable react/require-default-props */
import styled, { CSSProperties } from 'styled-components';
import { PageHeaderContainer, PageTitle, PageSubtitle } from './styles';

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
`;

export const PageHeader = ({
  actions,
  title,
  subtitle,
  actionsPosition,
  actionsAlignment,
  actionJustification,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  actionsPosition?: 'top' | 'bottom' | 'left' | 'right';
  actionsAlignment?: CSSProperties['alignItems'];
  actionJustification?: CSSProperties['justifyContent'];
}) => {
  return (
    <PageHeaderContainer
      actionAlignment={actionsAlignment}
      actionJustification={actionJustification}
      actionsPosition={actionsPosition ?? 'bottom'}
    >
      <div>
        <PageTitle>{title}</PageTitle>
        {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
      </div>
      {actions && <ActionContainer>{actions}</ActionContainer>}
    </PageHeaderContainer>
  );
};
